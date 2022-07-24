// import Field from '@/components/ui/field/Field'
// import TextArea from '@/components/ui/text-area/TextArea'
// import React, { FC } from 'react'
// import { Controller } from 'react-hook-form'
// import SuccessMessage from './SuccessMessage'
// import TogglePublic from './toggle-public/TogglePublic'

// import styles from './UploadVideoForm.module.scss'
// import { useUploadVideoForm } from './useUploadVideoForm'
// import VideoInformation from './video-information/VideoInformation'

// const UploadVideoForm: FC<{
// 	videoId: number
// 	handleCloseModal: () => void
// }> = ({ handleCloseModal, videoId }) => {
// 	const { form, status, media } = useUploadVideoForm({
// 		videoId,
// 		handleCloseModal
// 	})
// 	return <form className='flex flex-wrap' onSubmit={form.handleSubmit(form.submit)}>
//         {status.isSuccess && <SuccessMessage/>}
//         {status.isChosen ? (
//             <>
//             <div className='w-7/12 pr-6 pt-3'>
//                 <Field {...form.register('name', {
//                     required:'Название обязательно'
//                 })}
                
//                 placeholder='Название'
//                 error={form.errors.name}
//                 /> 
//                 <TextArea {...form.register('description', {
//                     required:'Описание обязательно'
//                 })}
                
//                 placeholder='Описание'
//                 error={form.errors.description}
//                 /> 
//                 <div className='mt-8'>
//                     <Controller
//                     control={form.control}
//                     name="thumbnailPath"
//                     render={({field:{onChange}}) => (
//                         <UploadField folder='thumbnails' onChange={(value:any) => {
//                             onChange(value.url)
//                         }} />
//                     )}
//                     />
//                 </div>
//                 <Controller
//                     control={form.control}
//                     name="isPublic"
//                     render={({field:{onChange,value}}) => (
//                         <TogglePublic isEnabled={!!value} clickHandler={() => {
//                             onChange(!value)
//                         }} />
//                     )}
//                     />
//                 </div>
//                 <div className='w-5/12 p-3 pl-10'>
//                     <VideoInformation
//                     fileName={media.video}
//                     />
//                 </div>
//                 </>
//         ) :}
//     </form>
// }

// export default UploadVideoForm
