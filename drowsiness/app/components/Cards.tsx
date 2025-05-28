'use client'

interface cardProp {
    title : string ,
    description : string
}
function Cards(prop : cardProp) {
  return (
            <section className = " px-6 py-4 max-w-[80%]  bg-violet-200">
                <div className="flex-col gap-1.5 font-mono">
                        <h2 className="text-black text-xl">{prop.title}</h2> 
                        <p className="text-gray-600 font-sans">{prop.description}
                        </p>

                </div>
            </section>
  )
}

export default Cards
