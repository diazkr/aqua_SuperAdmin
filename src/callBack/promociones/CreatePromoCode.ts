import { PromoCodeInterface } from "./GetAllPromos";

export interface CreatePromoCodeInfo {
  description: string;
  percentage: number;
  available_uses: number;
}

const createPromoCode = async (
  info: CreatePromoCodeInfo
): Promise<PromoCodeInterface | null> => {
  try {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/promotion/newPromotionCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, 

        },
        body: JSON.stringify(info), 
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el código de descuento");
    }

    const data: PromoCodeInterface = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el código de descuento", error);
    return null;
  }
};

export default createPromoCode;
