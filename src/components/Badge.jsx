export default function Badge({children, variant}){

    
    return(
        <span className={`badge ${variant}`}>{children}</span>
    )
}