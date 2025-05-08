package com.pknu.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Day0404_CartMemberProdDTO {
    private String cartNo;
    private String cartProd;
    private int cartQty;
    private String cartMember;

    private String memberName;
    private String memberEmail;

    private String prodName;
    private int prodSale;
}
