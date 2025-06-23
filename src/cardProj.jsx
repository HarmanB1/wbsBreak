export const Card = ({name, description, date, imgSrc })=>{
    return(
        <div className="">
            <h1 className="text-xl font-bold mb-2">{name}</h1>
            <img src={imgSrc} alt="Card image" />
            <div>
                <h2>Description</h2>
                <p>{description}</p>
                <p>Date: {date}</p>

            </div>
            


        </div>

    );
}