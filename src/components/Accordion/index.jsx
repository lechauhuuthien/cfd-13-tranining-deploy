import React, { useState } from "react";

function Accordion({ title = "", children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Hàm xử lý sự kiện khi một panel được mở
  function handlePanelClick(index) {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  // Trả về component cha và truyền các props vào các thành phần con
  return (
    <div className="accordion">
      {title && <h3 className="accordion__title label">{title}</h3>}
      {React.Children.map(children, (child, index) => {
        if (child?.type.name === "AccordionItem") {
          return React.cloneElement(child, {
            isActive: index === activeIndex,
            handlePanelClick: () => {
              handlePanelClick(index)
            },
          });
        }
      })}
    </div>
  );
}

// Thành phần con AccordionItem
function AccordionItem({
  children,
  isActive = false,
  handlePanelClick = () => {},
}) {
  return (
    <div className={`accordion__content ${isActive ? "active" : ""}`}>
      {React.Children.map(children, (child, index) => {
        if (child.type.name === "AccordionHeader") {
          // Khi truyền props vào AccordionHeader, ta cần đảm bảo rằng
          // onClick được gán lại để kích hoạt hàm handlePanelClick
          return React.cloneElement(child, {
            isActive: isActive,
            onClick: () => {
              console.log('here')
              handlePanelClick()
            },
          });
        } else if (child.type.name === "AccordionPanel") {
          // Khi truyền props vào AccordionPanel, ta chỉ cần truyền
          // isActive để biết panel đang được mở hay không
          return React.cloneElement(child, {
            isActive,
          });
        } else return;
      })}
    </div>
  );
}

// Thành phần con AccordionHeader
function AccordionHeader({ children, onClick = () => {} }) {
  return (
    <div className="accordion__content-title" onClick={onClick}>
      <h4>
        <strong>{children}</strong>
      </h4>
    </div>
  );
}

// Thành phần con AccordionPanel
function AccordionPanel({ children, isActive = false }) {
  return (
    <div
      className="accordion__content-text"
      style={{ display: isActive ? "block" : "none" }}
    >
      {children}
    </div>
  );
}

// Xuất các thành phần con để có thể sử dụng ngoài component
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

export default Accordion;
