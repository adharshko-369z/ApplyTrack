import  applyTrackLogo  from "../assets/applytrack-logo.svg"

export default function Header(){
    return(
        <>
        <header>
            <div className="logo">
                <img src={applyTrackLogo} alt="a suitcase inside an application track form" width="40" />
                <span>ApplyTrack</span>
            </div>
        </header>
        </>
    )
}