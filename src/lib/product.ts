interface ProductDesign {
   corporateShirtItems: ProductDesignItem[]
   casualShirtItems: ProductDesignItem[]
   corporateTrouserItems: ProductDesignItem[]
   causualTrouserItems: ProductDesignItem[]
   getItem: (type: ProductType, category: ProductCategory) => ProductDesignItem[]
}

export const productDesigns: ProductDesign = {
  getItem(type: ProductType, category: ProductCategory) {
    if ((type === 'shirt' || type === 'jacket') && category === 'corporates') {
      return this.corporateShirtItems
    } else if ((type === 'shirt' || type === 'jacket') && category === 'casuals') {
      return this.casualShirtItems
    } else if ((type === 'trouser' || type === 'short') && category === 'corporates') {
      return this.corporateTrouserItems
    } else if ((type === 'trouser' || type === 'short') && category === 'casuals') {
      return this.causualTrouserItems
    } else return []
  },
  corporateShirtItems: [
    { key: 'plain', label: 'Plain' },
    { key: 'checkered', label: 'Checkered' },
    { key: 'patterned', label: 'Patterned' },
    { key: 'striped', label: 'Striped' }
  ],
  casualShirtItems: [
    { key: 'plain', label: 'Plain' },
    { key: 'checkered', label: 'Checkered' },
    { key: 'abstract', label: 'Abstract' },
    { key: 'print', label: 'Print' }
  ],
  corporateTrouserItems: [
    { key: 'plain', label: 'Plain' },
    { key: 'striped', label: 'Stripe' },
    { key: 'abstract', label: 'Abstract' },
    { key: 'patterned', label: 'Patterned' }
  ],
  causualTrouserItems: [
    { key: 'plain', label: 'Plain' },
    { key: 'patterned', label: 'Patterned' },
    { key: 'jeans', label: 'Jeans' },
    { key: 'chinos', label: 'Chinos' },
    { key: 'corduroy', label: 'Corduroy' }
  ]
}
