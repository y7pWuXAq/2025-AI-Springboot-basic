package com.pknu.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Day0403_CartProdDTO {
    
    private String cartMo;
    private String cartProd;
    private int cartQty;
    private String cartMember;

    private String prodName;
    private int prodPrice;
    private int prodSale;
}
