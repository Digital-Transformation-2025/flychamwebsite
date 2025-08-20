import { useEffect, useCallback } from 'react'
import { group342Click, screenClick } from '@/util/tracks.js'
import useAnimation from '@/hooks/useAnimation'

/**
 * Page component generated from Phase design
 * Screen
 */
export default function Screen() {
  const apiScreenClick = useAnimation(screenClick)
  const apiGroup342Click = useAnimation(group342Click)

  const handleScreenClick = useCallback((e) => {
    apiScreenClick.forward()
  }, [])

  const handleGroup342Click = useCallback((e) => {
    apiGroup342Click.forward()
  }, [])
  // Automatically play screen animation on mount
  useEffect(() => {
    apiScreenClick.forward()
    apiGroup342Click.forward()
  }, [])
  return (
    <>
      {/* Phase element: Screen -- start */}
      <div
        data-ph-id="el-6-F3ca"
        // onClick={(e) => {
        //   handleScreenClick(e)
        // }}
        className="pointer-events-auto cursor-pointer absolute left-[50%] top-[50%] will-change-transform origin-top-left w-[286.2847900390625px] h-[195.92578125px] opacity-100 rounded-none"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          data-ph-layer-id="el-6-F3ca-fills-0"
          className="pointer-events-none absolute inset-0 bg-clip-padding opacity-100 rounded-none"
          style={{
            backgroundColor: '#ffffff'
          }}
        />

        <div className="pointer-events-none absolute inset-0 origin-top-left overflow-visible z-[1] rounded-none">
          {/* Phase element: Group 342 -- start */}
          <div
            data-ph-id="el-13-kXDf"
            // onClick={(e) => {
            //   handleGroup342Click(e)
            // }}
            className="pointer-events-auto cursor-pointer absolute left-0 top-0 will-change-transform origin-top-left w-[135.00888061523438px] h-[86.39653778076172px] opacity-100 rounded-none"
            style={{
              transform:
                'translate(75.63795471191406px, 53.76462173461914px) rotate(0deg) skew(0deg, 0deg) scale(1, 1) translate(0px, -2px) translate(0px, 2px) translate(0px, 0.023149075777494275px) translate(0px, -0.023149075777494275px)'
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 origin-top-left overflow-visible z-[1] rounded-none"
              style={{
                transform: 'translate(0px, -2px)'
              }}
            >
              {/* Phase element: Vector -- start */}
              <svg
                data-ph-id="el-16-kXDf"
                className="overflow-visible pointer-events-none absolute left-0 top-0 will-change-transform origin-top-left opacity-100"
                style={{
                  transform:
                    'translate(14.489031791687012px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1) translate(0px, 0px) translate(0px, 0px) translate(0px, 0px) translate(0px, 0px)'
                }}
              >
                <g className="pointer-events-none">
                  <defs>
                    <path
                      data-ph-geometry-id="el-16-kXDf"
                      id="el-16-kXDf-geometry"
                      d="M0 0L120.51984405517578 22.234800338745117L73.68441009521484 45.885704040527344C61.533416748046875 42.300785064697266 50.875003814697266 35.7368278503418 50.875003814697266 35.7368278503418C37.83177947998047 28.923795700073242 21.839168548583984 18.16530990600586 0 0Z"
                    />
                  </defs>
                  <use
                    data-ph-layer-id="el-16-kXDf-fills-0"
                    xlinkHref="#el-16-kXDf-geometry"
                    className="stroke-none"
                    style={{
                      fill: '#baa981',
                      fillOpacity: '1'
                    }}
                  />
                </g>
              </svg>
              {/* Phase element: Vector -- end */}
              {/* Phase element: Vector -- start */}
              <svg
                data-ph-id="el-14-kXDf"
                className="overflow-visible pointer-events-none absolute left-0 top-0 will-change-transform origin-top-left opacity-100"
                style={{
                  transform:
                    'translate(0px, 24.201589584350586px) rotate(0deg) skew(0deg, 0deg) scale(1, 1) translate(0px, 0px) translate(0px, 0px) translate(0px, 0px) translate(0px, 0px)'
                }}
              >
                <g className="pointer-events-none">
                  <defs>
                    <path
                      data-ph-geometry-id="el-14-kXDf"
                      id="el-14-kXDf-geometry"
                      d="M134.97438049316406 0L134.9906005859375 0.016224894672632217L0 64.1949462890625L63.52882385253906 60.79792404174805C97.45084381103516 56.85615921020508 125.64633178710938 32.84843063354492 134.97438049316406 0Z"
                    />
                  </defs>
                  <use
                    data-ph-layer-id="el-14-kXDf-fills-0"
                    xlinkHref="#el-14-kXDf-geometry"
                    className="stroke-none"
                    style={{
                      fill: '#d6c89f',
                      fillOpacity: '1'
                    }}
                  />
                </g>
              </svg>
              {/* Phase element: Vector -- end */}
            </div>
          </div>
          {/* Phase element: Group 342 -- end */}
          {/* Phase element: Rectangle 2 -- start */}
          <div
            data-ph-id="el-39-kXDf"
            className="pointer-events-none absolute left-0 top-0 w-[123px] h-[2px] will-change-transform origin-top-left opacity-100 rounded-[1px]"
            style={{
              transform:
                'translate(137.46615600585938px, 149.929931640625px) rotate(0deg) skew(0deg, 0deg) scale(1, 1) translate(0px, 0px) translate(-61.5px, -1px) translate(-0.5px, -0.5px) translate(0.5px, 0.5px)'
            }}
          >
            <div
              data-ph-layer-id="el-39-kXDf-fills-0"
              className="pointer-events-none absolute inset-0 bg-clip-padding opacity-100 rounded-[1px]"
              style={{
                backgroundColor: '#d8d8d8'
              }}
            />
          </div>
          {/* Phase element: Rectangle 2 -- end */}
          {/* Phase element: Rectangle 2 -- start */}
          <div
            data-ph-id="el-40-kXDf"
            className="pointer-events-none absolute left-0 top-0 w-[4px] h-[2px] will-change-transform origin-top-left opacity-100 rounded-[1px]"
            style={{
              transform:
                'translate(77.96615600585938px, 149.929931640625px) rotate(0deg) skew(0deg, 0deg) scale(1, 1) translate(0px, 0px) translate(-2px, -1px) translate(-0.5px, -0.5px) translate(0.5px, 0.5px)'
            }}
          >
            <div
              data-ph-layer-id="el-40-kXDf-fills-0"
              className="pointer-events-none absolute inset-0 bg-clip-padding opacity-100 rounded-[1px]"
              style={{
                backgroundColor: '#d6c89f'
              }}
            />
          </div>
          {/* Phase element: Rectangle 2 -- end */}
        </div>
      </div>
      {/* Phase element: Screen -- end */}
    </>
  )
}
