import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect } from 'react';

const PricingAccordion = ({ pricingInfo }) => {
  const [openTypes, setOpenTypes] = useState({}); // ✅ multiple open
  const [heights, setHeights] = useState({});
  const contentRefs = useRef({});

  const toggleAccordion = (type) => {
    setOpenTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getLabel = (type) => {
    switch (type) {
      case 'ADT': return 'Adult';
      case 'CHD': return 'Child';
      case 'INF': return 'Infant';
      default: return type;
    }
  };

  useEffect(() => {
    const newHeights = {};
    pricingInfo?.forEach((item) => {
      const el = contentRefs.current[item.PaxType];
      if (el) newHeights[item.PaxType] = el.scrollHeight;
    });
    setHeights(newHeights);
  }, [pricingInfo]);

  return (
    <div className="text-sm space-y-2">
      {pricingInfo?.map((item, idx) => {
        const isOpen = openTypes[item.PaxType]; // ✅ support multiple

        return (
          <div key={idx} className="border-b border-[#E5E5E3] pb-2">
            {/* Accordion Header */}
            <div
              className="flex justify-between items-center cursor-pointer text-[#000] text-[16px] font-semibold py-2"
              onClick={() => toggleAccordion(item.PaxType)}
            >
              <span>Per {getLabel(item.PaxType)}</span>
              <span className="text-sm text-secondary">
                {isOpen ? <CaretUp size={18} /> : <CaretDown size={18} />}
              </span>
            </div>

            {/* Accordion Content with Transition */}
            <div
              ref={(el) => (contentRefs.current[item.PaxType] = el)}
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isOpen ? `${heights[item.PaxType] || 0}px` : '0px',
              }}
            >
              <div className="space-y-1 mt-2 pl-1 pt-1">
                <div className="flex justify-between">
                  <span className="text-600">Fare</span>
                  <span className="text-600">{item.BaseFareEquiv[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-600">Taxes</span>
                  <span className="text-600">{item.TotalTaxEquiv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-600">Fees</span>
                  <span className="text-600">{item.TotalFeesEquiv}</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span className="text-700">Sub-total</span>
                  <span className="text-700 text-lg">{item.TotalEquiv}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingAccordion;
