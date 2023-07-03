//@ts-nocheck
import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import PaymentItem from "../../components/PaymentItem";

const MyPayment = () => {
  const { paymentInfo } = useAuthen();

  const hasPaymentInfo = !!paymentInfo?.length;

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {hasPaymentInfo &&
        paymentInfo?.map((payment) => (
          <PaymentItem key={payment.id} {...payment} />
        ))}
      {!hasPaymentInfo && <p className="text">Bạn chưa có thanh toán nào!</p>}
    </div>
  );
};

export default MyPayment;
