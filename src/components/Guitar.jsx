const Guitar = ({guitar, handleCartChange}) => {

    const { id, name, price, image, description } = guitar;

    return (
        <div class="col-md-6 col-lg-4 my-4 row align-items-center">
            <div class="col-4">
                <img class="img-fluid" src={`./public/img/${image}.jpg`} alt={`imagen ${name}`} />
            </div>
            <div class="col-8">
                <h3 class="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p class="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    class="btn btn-dark w-100"
                    onClick={() => handleCartChange(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}

export default Guitar;