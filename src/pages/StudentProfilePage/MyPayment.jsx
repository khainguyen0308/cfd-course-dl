import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import { formatCurrency, formatDate } from "../../utils/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();

  console.log("paymentInfo", paymentInfo);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {paymentInfo?.length === 0 && (
        <Empty
          description="Không tìm thấy dữ liệu nào"
          style={{ margin: "0 auto" }}
        />
      )}
      {paymentInfo?.length > 0 &&
        paymentInfo.map((item, index) => (
          <div
            className="itemhistory"
            key={item?.id || new Date().getTime() + index}
          >
            <div className="name">{item?.course?.name}</div>
            <div className="payment">{item?.paymentMethod}</div>
            <div className="date">{formatDate(item?.course?.createdAt)}</div>
            <div className="money">
              {formatCurrency(item?.course?.price)} VND
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyPayment;
