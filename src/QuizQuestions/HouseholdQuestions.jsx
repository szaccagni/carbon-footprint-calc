import Slider from '@mui/material/Slider'

export default function QuizQuestions({answers, setAnswers}) {

    const marksPeople = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5+',
        }
    ]

    const marksIncome = [
        {
            value: 10000,
            label: '10k'
        },
        {
            value: 20000,
            label: '20k'
        },
        {
            value: 30000,
            label: '30k'
        },
        {
            value: 40000,
            label: '40k'
        },
        {
            value: 50000,
            label: '50k'
        },
        {
            value: 60000,
            label: '60k'
        },
        {
            value: 70000,
            label: '70k'
        },
        {
            value: 80000,
            label: '80k'
        },
        {
            value: 90000,
            label: '90k'
        },
        {
            value: 100000,
            label: '100k'
        },
        {
            value: 110000,
            label: '110k'
        },
        {
            value: 120000,
            label: '120k'
        },
    ]

    return (
        <div>
            <div style={{width: '60%', marginTop: '20px', marginBottom: '20px'}}>
                <div className='question-text'>How many people live in your household?</div>
                <Slider
                    aria-label="household members"
                    defaultValue={answers.houseQs.members}
                    step={1}
                    marks={marksPeople}
                    min={1}
                    max={5}
                    color="primary"
                    onChange={(e) => {
                        const newAnswers = {...answers}
                        newAnswers.houseQs.members = e.target.value
                        setAnswers(newAnswers)
                    }}
                />
            </div>
            <div style={{width: '60%', marginBottom: '20px'}}>
                <div className='question-text'>What is your gross annual household income?</div>
                <Slider
                    aria-label="household income"
                    defaultValue={answers.houseQs.income}
                    marks={marksIncome}
                    step={10000}
                    min={10000}
                    max={120000}
                    color="primary"
                    onChange={(e) => {
                        const newAnswers = {...answers}
                        newAnswers.houseQs.income = e.target.value
                        setAnswers(newAnswers)
                    }}
                />
            </div>
        </div>
    )
}