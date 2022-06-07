import './App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from './core/parts/Navbar';

function App() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const gender = watch("gender");

  const initialStateBfp = { bfp: 0, pointer: 0, display: false };
  const [ bfp, setBfp ] = useState(initialStateBfp);

  const onSubmit = (form) => {
    // We calculate percentage of fat
    var BFP = (form.gender === "H") ? 
        (495 / ((1.0324 - (0.19077 * Math.log10(parseFloat(form.waist) - parseFloat(form.neck)))) + (0.15456 * Math.log10(form.height)))) - 450 : 
        (495 / ((1.29579 - (0.35004 * Math.log10((parseFloat(form.waist) + parseFloat(form.hip)) - parseFloat(form.neck)))) + (0.221 * Math.log10(form.height)))) - 450;

    // Enable view results in DOM
    setBfp({ ...bfp, display: true });

    // After loading the DOM we calculate the position of the pointer
    setTimeout(() => {
      var widthCategorization = document.querySelector('.categorization').offsetWidth, margin = 0;

      if(BFP < 20)
        margin = (widthCategorization * (BFP / (form.gender === "H" ? 40 : 100))) - 80;
      else if(BFP < 25)
        margin = (widthCategorization * (BFP / (form.gender === "H" ? 30 : 60))) - 80;
      else 
        margin = (widthCategorization * (BFP / (form.gender === "H" ? 30 : 35))) - 80;

      margin = margin < 0 ? 0 : (margin > widthCategorization ? (widthCategorization - 80) : margin);

      setBfp({bfp: BFP.toFixed(2), pointer: margin, display: true});
    }, 1000);
  }

  function handleClear(event) {
    event.preventDefault();
    
    reset();
    setBfp(initialStateBfp);
  }

  return (
    <div className="app">
      <Navbar />
      <div id="container">
        <div className="row">
          <div className="col-sm-5">

            <div className="row">
              <div className="col-sm-12">
                <h1>Calculadora de Grasa Corporal</h1>
                <p className="color-gray">El método de la Marina de Estados Unidos (US Navy Method) ofrece una manera sencilla 
                  de calcular el aproximado del porcentaje de tejido ediposo en el cuerpo de una persona.</p>
                <p className="color-gray">Los valores requeridos por la fórmula son los siguientes.</p><br/>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">

                <form onSubmit={handleSubmit(onSubmit)} name="formData">
                  <div className={`form-group ${errors.gender ? "has-error" : ""}`}>
                    <div><label className="form-label">Género</label></div>
                    <label className="radio-inline">
                      <input type="radio" value="H" {...register("gender", { required: true })}/> Hombre
                    </label>
                    <label className="radio-inline">
                      <input type="radio" value="M" {...register("gender", { required: true })}/> Mujer
                    </label>
                    <small className="input-error">Seleccione su género</small>
                  </div>

                  <div className={`form-group ${errors.height ? "has-error" : ""}`}>
                    <label htmlFor="height" className="form-label">Altura (cm)</label>
                    <input type="text" className="form-control" placeholder="Escribe tu altura" {...register("height", { required: true, pattern: /^((1[0-9]{2})|(2[0-1]{1}[0-9]{1}))?(\.[0-9]{0,2})?$/ })} autoComplete="off"/>
                    <small className="input-error">El valor es incorrecto. Ej. 170</small>
                  </div>

                  <div className={`form-group ${errors.weight ? "has-error" : ""}`}>
                    <label htmlFor="weight" className="form-label">Peso (kg)</label>
                    <input type="text" className="form-control" placeholder="Escribe tu peso" {...register("weight", { required: true, pattern: /^(([5-9]{1}[0-9]{1})|(1[0-9]{2}))?(\.[0-9]{0,2})?$/ })} autoComplete="off"/>
                    <small className="input-error">El valor es incorrecto. Ej. 80.56</small>
                  </div>

                  {
                    gender === "M" && (
                      <div className={`form-group ${errors.hip ? "has-error" : ""}`}>
                        <label htmlFor="hip" className="form-label">Cadera (cm)</label>
                        <input type="text" className="form-control" placeholder="Medida de tu cadera" {...register("hip", { required: true, pattern: /^(([5-9]{1}[0-9]{1})|(1[0-9]{2}))?(\.[0-9]{0,2})?$/ })} autoComplete="off"/>
                        <small className="input-error">El valor es incorrecto. Ej. 90</small>
                      </div>
                    )
                  }

                  <div className={`form-group ${errors.waist ? "has-error" : ""}`}>
                    <label htmlFor="waist" className="form-label">Cintura (cm)</label>
                    <input type="text" className="form-control" placeholder="Medida de tu cintura" {...register("waist", { required: true, pattern: /^(([5-9]{1}[0-9]{1})|(1[0-9]{2}))?(\.[0-9]{0,2})?$/ })} autoComplete="off"/>
                    <small className="input-error">El valor es incorrecto. Ej. 90</small>
                  </div>

                  <div className={`form-group ${errors.neck ? "has-error" : ""}`}>
                    <label htmlFor="neck" className="form-label">Cuello (cm)</label>
                    <input type="text" className="form-control" placeholder="Medida de tu cuello" {...register("neck", { required: true, pattern: /^[2-9]{1}[0-9]{1}(\.[0-9]{0,2})?$/ })} autoComplete="off"/>
                    <small className="input-error">El valor es incorrecto. Ej. 20</small>
                  </div>

                  <div className="form-group">
                    <button type="submit" className={`btn btn-primary `}>Calcular</button>
                    <button className="btn btn-secondary" onClick={handleClear}>Limpiar</button>
                  </div>
                </form>
                
              </div>
            </div>
          </div>

          {/* Show results */}
          <div className="col-sm-5 col-sm-offset-1 categorization-section" style={{display: bfp.display ? "block" : "none"}}>
            <div className="row">
              <div className="col-sm-12">
                <h2>Tu resultado: {bfp.bfp}%</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                
                {/* Represents the pointer */}
                <div style={{position: "relative", width: "100%"}}>
                  <div className="categorization-pointer" style={{left: bfp.pointer + "px"}}>
                    <span className="categorization-pointer-text">{bfp.bfp}%</span>
                    <div className="categorization-pointer-vector"></div>
                  </div>
                </div>

                {/* Represents the color bar */}
                <div className="categorization"></div>
                
                {/* Represents category information */}
                <div className="categorization-range">
                  <div className="categorization-range-image" style={{backgroundColor: "#009ed6"}}></div>
                  <div className="categorization-range-text">
                    {gender === "H" && <p className="text-bold">2-4%</p>}
                    {gender === "M" && <p className="text-bold">10-13%</p>}
                    <p>Esencial</p>
                  </div>
                </div>
                <div className="categorization-range">
                  <div className="categorization-range-image" style={{backgroundColor: "#0ea03a"}}></div>
                  <div className="categorization-range-text">
                    {gender === "H" && <p className="text-bold">6-13%</p>}
                    {gender === "M" && <p className="text-bold">14-20%</p>}
                    <p>Deportista</p>
                  </div>
                </div>
                <div className="categorization-range">
                  <div className="categorization-range-image" style={{backgroundColor: "#b1c416"}}></div>
                  <div className="categorization-range-text">
                    {gender === "H" && <p className="text-bold">14-17%</p>}
                    {gender === "M" && <p className="text-bold">21-24%</p>}
                    <p>Fitness</p>
                  </div>
                </div>
                <div className="categorization-range">
                  <div className="categorization-range-image" style={{backgroundColor: "#ffbd00"}}></div>
                  <div className="categorization-range-text">
                    {gender === "H" && <p className="text-bold">18-24%</p>}
                    {gender === "M" && <p className="text-bold">25-31%</p>}
                    <p>Aceptable</p>
                  </div>
                </div>
                <div className="categorization-range">
                  <div className="categorization-range-image" style={{backgroundColor: "#eb8a14"}}></div>
                  <div className="categorization-range-text">
                    {gender === "H" && <p className="text-bold">25%</p>}
                    {gender === "M" && <p className="text-bold">32%</p>}
                    <p>Obeso</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
