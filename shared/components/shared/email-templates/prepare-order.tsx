import * as React from 'react';

interface EmailTemplateProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<EmailTemplateProps> = ({ orderId, totalAmount, paymentUrl, }) => (
    <div>
        <h1>Заказ #{orderId}</h1>
        <p><a href={paymentUrl}>Оплатите</a> заказ на сумму {totalAmount} ₽</p>
    </div>
);