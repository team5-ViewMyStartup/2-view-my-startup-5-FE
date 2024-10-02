import React from "react";

const ListItem = ({ row }) => {
  return (
    <li>
      <span>{row.rank}</span>
      <span>{row.name}</span>
      <span>{row.description}</span>
      <span>{row.category}</span>
      <span>{row.totalInvestment}</span>
      <span>{row.revenue}</span>
      <span>{row.employees}</span>
    </li>
  );
};
export default ListItem;
