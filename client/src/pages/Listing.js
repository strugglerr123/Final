import React from "react"

export default function Listing() {
  return (
    <main className=''>
      <h1 className='my-4 flex flex-col uppercase font-semibold text-center text-4xl'>
        Create listing
      </h1>
      <form className='flex flex-col sm:flex-row'>
        <div>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength={"62"}
            minLength={"10"}
            required
          />
        </div>
      </form>
    </main>
  )
}
