export interface Horse {
    id: string
    name: string
    location: string
    registeredAt: Date
    owner?: {
        name: string
    }
    // Add other relevant fields
} 