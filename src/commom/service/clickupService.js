import { propApi } from "../infra/propApi";

const spaceUrl = "clickup/space/90070088088";
// const spaceUrl = "clickup/space/453254";

const clickupService = {
  saveProject: async (projeto) => {
    const folderId = await clickupService.createFolder(projeto) //Se o nome já existir, criar nome alternativo
    let first = true;
    let taskLink;
    let parentId;

    for (let item of projeto.escopo) {
      if (item.tipo === 'fase') {
        parentId = await clickupService.createList(item, folderId);
      } else {
        if (first) {
          const tarefa = {
            nome: "Onboarding e cronograma",
            tempo: 1,
            pessoas: 1
          }
          const firstTaskConn = await clickupService.createTask(tarefa, parentId, first);
          taskLink = firstTaskConn.url;
          first = false;
        }
        const taskConn = await clickupService.createTask(item, parentId);
      }
    }
    return { folderId, taskLink };
  },

  createFolder: async (projeto) => {
    let name = projeto.marca != "" || projeto.marca != undefined ? projeto.marca : projeto.cliente

    switch (projeto.categoria) {
      case "IV":
        name += " - id visual"
        break;
      case "NAM":
        name += " - naming"
        break;
      case "NIV":
        name += " - naming + id visual"
        break;
      case "EMB":
        name += " - embalagem"
        break;
      case "DESIGN":
        name += " - design"
        break;
      case "MOVIE":
        name += " - movie"
        break;
      default:
        name += " - projeto"
        break;
    }

    try {
      const conexao = await propApi(`${spaceUrl}/folder`, {
        method: "POST",
        data: JSON.stringify({ name })
      })

      return conexao.data.id;
    } catch (err) {
      if (err.response.data.ECODE == "CAT_014") {
        const novoProjeto = { ...projeto, marca: projeto.marca + "-" };
        return await clickupService.createFolder(novoProjeto);
      }
      throw new Error(err);
    }
  },

  createList: async (item, folderId) => {
    const conexao = await propApi(`clickup/folder/${folderId}/list`, {
      method: "POST",
      data: JSON.stringify({ name: item.nome })
    })

    return conexao.data.id;
  },

  createTask: async (tarefa, listId, first) => {
    if (tarefa.pessoas == "") { tarefa.pessoas = 1 }

    const obj = {
      name: tarefa.nome,
      time_estimate: parseInt(Number(tarefa.tempo) * Number(tarefa.pessoas)) * 3600000
    }

    if (first) {
      let proximoDiaUtil = new Date();
      proximoDiaUtil.setDate(proximoDiaUtil.getDate() + 1);
      while (proximoDiaUtil.weekday == 6 || proximoDiaUtil.weekday == 7) {
        proximoDiaUtil.setDate(proximoDiaUtil.getDate() + 1);
      }
      proximoDiaUtil.setHours(4, 0, 0);

      obj.assignees = [59506]; //Dilon
      obj.due_date = Math.floor(proximoDiaUtil.getTime());
      obj.notify_all = true;
    }

    const conexao = await propApi(`clickup/list/${listId}/task`, {
      method: "POST",
      data: JSON.stringify(obj)
    })

    return conexao.data;
  },

  deleteProject: async (folderId) => {
    const conexao = await propApi(`clickup/folder/${folderId}`, { method: 'DELETE' });
    return {
      deleted: conexao.status === 200,
      data: conexao.data,
    };
  }
}

export default clickupService;