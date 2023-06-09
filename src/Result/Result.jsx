import PieChart from '../PieChart/PieChart'
import Button from '@mui/material/Button';

export default function Result({zipCodeData, resetQuiz, results, recommendations}) {
    console.log(results)
    const usAvg = 49.75
    const backgroundColorResult = results.total > usAvg ? 'darkred' : 'darkgreen'
    const resultsSummary = `Your footprint is ${results.total > usAvg ? 'higher' : 'lower'} than the United States average${results.total > usAvg ? '' : ', Nice Job!'}`

    return (
        <div className='result-page'>
            <div className="quiz-result">
                <div className="result-large" style={{backgroundColor: backgroundColorResult}}>
                    <div style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <div>{results.total}</div>
                        <div style={{fontSize: '25px'}}>tons CO2eq/year</div>
                    </div>
                    <div style={{ height: '40%', display: 'flex', alignItems: 'flex-end'}}>
                        <div className='result-small-text' style={{color: 'white'}}>{resultsSummary}</div>
                    </div>
                </div>
                <div className="result-small-top">
                    <PieChart results={results}/>
                </div>
                <div className="result-small-bottom">
                </div>
            </div>
            <div className="result-large-bottom">         
                <div className='reduce-text'>Reduce Your Impact</div>
                <ul>
                    {
                        recommendations.travelRecommendation.map((recommended, idx) => 
                            <li key={idx} className='result-small-text recommendation'>{recommended}</li>
                        )
                    }
                    {
                        recommendations.stuffRecommendation.map((recommended, idx) => 
                            <li key={idx} className='result-small-text recommendation'>{recommended}</li>
                        )
                    }
                    {
                        recommendations.foodRecommendation.map((recommended, idx) => 
                            <li key={idx} className='result-small-text recommendation'>{recommended}</li>
                        )
                    }
                </ul>   
            </div>
            <div style={{textAlign: 'center'}}>
                <Button
                className='App-btn'
                onClick={resetQuiz}
                variant="contained"
                >take the quiz again</Button>
            </div>
        </div>
    )
}