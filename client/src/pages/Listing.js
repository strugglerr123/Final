import React from "react"

export default function Listing() {
  return (
    <main className=' p-2 max-w-4xl mx-auto'>
      <h1 className='my-4 flex flex-col uppercase font-semibold text-center text-4xl'>
        Create listing
      </h1>
      <form action='listing' className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-2 flex-1 mr-10'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg text-center'
            id='name'
            maxLength={"60"}
            minLength={"10"}
            required
          />
          <textarea
            type='text'
            placeholder='Descriptions'
            className='border p-3 rounded-lg text-center'
            id='descriptions'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg text-center'
            id='address'
            required
          />
          <input
            type='text'
            placeholder='Type'
            className='border p-3 rounded-lg text-center'
            id='type'
            required
          />
          <div className=' flex gap-4 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='refurbunished'
                id='refurbunished'
                className='w-5'
              />
              <span>Refurbunished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='deliverable'
                id='deliverable'
                className='w-5'
              />
              <span>Deliverable</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' name='offer' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='originalprice'
                id='originalprice'
                className='p-2 border border-grey-400 rounded-lg w-20'
              />
              <span>Originalprice</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='sellingprice'
                id='sellingprice'
                className='p-2 border border-grey-400 rounded-lg w-20 '
              />
              <span>Sellingprice</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='number'
                name='quantity'
                id='quantity'
                className='p-2 border border-grey-400 rounded-lg w-20'
              />
              <span>Quantity</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-5'>
          <p className=' font-semibold'>
            Images:
            <span className='font-normal text-gray-500 ml-2'>
              First Image will cover (max-6)
            </span>
          </p>
          <div className='flex gap-3'>
            <input
              type='file'
              id='images'
              accept='images/*'
              multiple
              className='P-2 border border-gray-600 rounded w-full self-center'
            />
            <button className='p-[1.5] text-red-400 border border-red-600 uppercase hover:shadow-lg disabled:opacity-70 rounded'>
              upload
            </button>
          </div>
          <button className='border border-blue-700 bg-blue-200 hover:opacity-85 p-3 rounded-lg hover:shadow-md uppercase'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  )
}
