import stylesHeader from '../ProjectHeader/ProjectHeader.module.scss';
import stylesBody from '../ProjectBody/ProjectBody.module.scss';
import { Skeleton, Tab } from '@mui/material';
import StandardInput from '@/components/elements/StandardInput';
import Task from '@/components/patterns/Task';
import OutlinedInput from '@/components/elements/OutlinedInput';

export default function ProjectLoading() {
  return (
    <>
      <section className={stylesHeader.projectHeaderContainer}>
        <div className='container'>
          <div className={stylesHeader.titleContainer}>
            <div>
              <Skeleton width='200px' height='50px' sx={{ marginTop: '1rem' }}></Skeleton>
            </div>
            <div></div>
          </div>
          <div className={stylesHeader.inputContainer} style={{ marginTop: '1.5rem' }}>
            <div className={stylesHeader.col}>
              <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><StandardInput /></Skeleton>
              <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><StandardInput /></Skeleton>
            </div>
            <div className={stylesHeader.col}>
              <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><StandardInput /></Skeleton>
              <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><StandardInput /></Skeleton>
            </div>
          </div>
        </div>
      </section>
      <section className={stylesBody.projectBodyContainer}>
        <div className='container'>
          <div className={`row ${stylesBody.tabNavigation}`}>
            <Skeleton sx={{ margin: '0.5rem auto 0 auto', display: 'inline-block' }}><Tab /></Skeleton>
          </div>
          <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><OutlinedInput /></Skeleton>
            <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><OutlinedInput /></Skeleton>
            <Skeleton width='100%' sx={{ margin: '0.5rem 0' }}><OutlinedInput /></Skeleton>
          </div>
        </div>
      </section>
    </>
  )
}
