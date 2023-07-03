import React from "react";
import { formatCurrency, formatTimeDisplay } from "../../utils/format";
const PaymentItem = ({ course, paymentMethod, createdAt }) => {
  return (
    <div className="itemhistory">
      <div className="name">{course?.name}</div>
      <div className="payment">{paymentMethod}</div>
      <div className="date">{formatTimeDisplay(createdAt)}</div>
      <div className="money">{formatCurrency(course?.price)} VND</div>
    </div>
  );
};

export default PaymentItem;
