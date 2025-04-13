import React, { useState } from "react";

export default function ListBox({children}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "x" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
