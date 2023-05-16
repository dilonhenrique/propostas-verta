import listaDispatcher from '@/commom/dispatchers/listaDispatcher'
import React from 'react'
import { TbArrowDown, TbArrowUp } from 'react-icons/tb'

export default function Orderer({ chave, label, order }) {
  return (
    <div
      onClick={() => listaDispatcher.setOrder(chave)}
      style={{
        fontWeight: order.key === chave ? 'bold' : 'inherit',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {label}
      {order.key !== chave
        ? ''
        : order.asc
          ? <TbArrowDown />
          : <TbArrowUp />
      }
    </div>
  )
}
