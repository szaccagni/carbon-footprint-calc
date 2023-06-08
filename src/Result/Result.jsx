import PieChart from '../PieChart/PieChart'

export default function Result({zipCodeData}) {
    const usAvg = 49.75
    const backgroundColorResult = zipCodeData.householdFootPrint > usAvg ? 'darkred' : 'darkgreen'
    const resultsSummary = `${zipCodeData.householdFootPrint > usAvg ? 'higher' : 'lower'} than the united states average of ${usAvg}`

    return (
        <>
        <div className="quiz-result">
            <div className="result-large" style={{backgroundColor: backgroundColorResult}}>
                <div>
                    <div>{zipCodeData.householdFootPrint}</div>
                    <div style={{fontSize: '25px'}}>tons CO2eq/year</div>
                </div>
                <div className='result-small-text' style={{color: 'grey'}}>{resultsSummary}</div>
            </div>
            <div className="result-small-top">
                <div className='result-small-text'>breakdown</div>
                <PieChart zipCodeData={zipCodeData}/>
            </div>
            <div className="result-small-bottom">
            </div>
        </div>
        <div className="result-large-bottom">         
            <div className='reduce-text'>Reduce Your Impact</div>   
        </div>
        </>
    )
}