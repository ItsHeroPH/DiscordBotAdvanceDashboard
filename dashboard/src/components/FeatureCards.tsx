import { useInView } from "react-intersection-observer"

interface FeatureData {
    name: string,
    description: string,
    image: string | null
}

export default function FeatureCards({ feature, index } : { feature: FeatureData, index: number }) {
    const { ref, inView } = useInView({
        threshold: 0.15,
        delay: 300,
        triggerOnce: true
    })
    return (
        <div ref={ref} className={`w-full transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            { index % 2 === 0 ? (
                <div className="hidden lg:grid lg:grid-cols-6 xl:grid-cols-11 gap-16 items-center my-2">
                    <div className="col-span-3 xl:col-start-2">
                        { feature.image ? (
                            <img className="min-w-fit max-w-[400px] aspect-square" src={feature.image}/>
                        ) : (
                            <div className="w-[400px] h-[400px] bg-neutral-600 rounded-md"/>
                        )}
                    </div>
                    <div className="col-span-3 xl:col-span-4 xl:col-start-7">
                        <h1 className="text-4xl text-white font-black my-3">{feature.name}</h1>
                        <p className="text-md text-gray-400 font-medium text-wrap">{feature.description}</p>
                    </div>
                </div>
            ) : (
                <div className="hidden lg:grid lg:grid-cols-6 xl:grid-cols-11 gap-16 items-center my-2">
                    <div className="col-span-3 xl:col-span-4 xl:col-start-2">
                        <h1 className="text-4xl text-white font-black my-3">{feature.name}</h1>
                        <p className="text-md text-gray-400 font-medium text-wrap">{feature.description}</p>
                    </div>
                    <div className="col-span-3 xl:col-start-7">
                        { feature.image ? (
                            <img className="min-w-fit max-w-[400px] aspect-square" src={feature.image}/>
                        ) : (
                            <div className="w-[400px] h-[400px] bg-neutral-600 rounded-md"/>
                        )}
                    </div>
                </div>
            )}
            <div className="lg:hidden flex flex-col items-center my-5">
                { feature.image ? (
                    <img className="min-w-fit max-w-[400px] aspect-square" src={feature.image}/>
                ) : (
                    <div className="w-[400px] h-[400px] bg-neutral-600 rounded-md"/>
                )}
                <div>
                    <h1 className="text-4xl text-white font-black text-center my-4">{feature.name}</h1>
                    <p className="text-md text-gray-400 font-medium text-wrap">{feature.description}</p>
                </div>
            </div>
        </div>
    )
}