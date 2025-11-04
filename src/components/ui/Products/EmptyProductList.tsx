import { PackageSearch } from 'lucide-react'


type Props = {
  variant?: 'default' | 'marketplace' | 'maylike'
}

const emptyStateContent = {
  default: {
    title: 'No products available',
    description: 'There are no featured products at the moment. Check back soon for new arrivals!'
  },
  marketplace: {
    title: 'No products match your search',
    description: 'Try adjusting your filters, changing your search terms, or browse all categories.'
  },
  maylike: {
    title: 'No recommendations yet',
    description: 'We\'re still learning your preferences. Browse our catalog to help us suggest products you\'ll love.'
  }
}

export default function EmptyProductList({ variant = 'default' }: Props) {
    const content = emptyStateContent[variant]

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
        <PackageSearch size={36} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">{content.title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
       {content.description}
      </p>
    </div>
  )
}