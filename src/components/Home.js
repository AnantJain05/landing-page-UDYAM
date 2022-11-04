import "../App.css"
import Title from "./title"
import Event from "./event"

function Home(){
    return(
        <>
            <Title />
      <div className="landing-page-images">
        <img src="/assets/udyam_best.jpg" alt=""/>
      </div>
      <div className="characters-image">
        <img src="/assets/Characters3.png" alt="" />
      </div>
      {/* <ComingSoonComp /> */}
      <div className="event-list-main">
        <Event />
      </div>
        </>
    )
}

export default Home;