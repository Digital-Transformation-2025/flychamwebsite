import Image from 'next/image'

const GridCards = ({ gridImages }) => {
  return (
    <div className="flex flex-col md:flex-row sm:gap-5 gap-5 justify-center 2xl:justify-end items-center  md:items-start">
      
      {/* Left Column */}
      <Column images={gridImages.slice(0, 2)} />

      {/* Right Column with stagger */}
      <Column images={gridImages.slice(2, 4)} extraClass="md:mt-10" />

    </div>
  )
}

const Column = ({ images, extraClass = "" }) => (
  <div className={`flex flex-row md:flex-col gap-x-2 gap-y-5 w-auto ${extraClass}`}>
    {images.map((img, i) => <Card key={i} src={img.image} />)}
  </div>
)

const Card = ({ src }) => (
  <div className="w-[234px] h-[260px] bg-gray-300 rounded-xl overflow-hidden">
    <Image
      src={src}
      alt="grid-card"
      width={234}
      height={260}
      className="w-full h-full object-cover"
    />
  </div>
)

export default GridCards
