export default function Badge({children, variant}){

    const variantmap = variant.toLowerCase().replace(/\s+/g, "")
    
    return(
        <span className={`badge ${variantmap}`}>{children}</span>
    )
}