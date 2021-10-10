import React from 'react';
import {
    Button,
    CardGrid,
    ContentCard,
    Group,
    Link,
    Spinner,
    Text,
    ViewWidth,
    withAdaptivity
} from "@vkontakte/vkui";

function RenderRecommendation(props) {
    return <ContentCard disabled={true}
        image={props.item.image_url}
        header={<Link href={props.item.hobby_url} target="_blank">{props.item.hobby_ru}</Link>}
        text={props.item.hobby_en}
        caption="photo by pexels.com"
        height={300}
    />
}

function RenderRecommendations(props) {
    const has_recommendation = props.recommendation.length > 0;
    if (!has_recommendation) {
        return <br />
    }

    let size = 's'
    if (props.viewWidth <= ViewWidth.MOBILE) {
        size = 'l'
    }

    return (
        <Group mode='plain'>
            <CardGrid size={size}>
                {props.recommendation.slice(0, 3).map((item) => <RenderRecommendation item={item}/>)}
            </CardGrid>
            <CardGrid size={size}>
                {props.recommendation.slice(3, 6).map((item) => <RenderRecommendation item={item}/>)}
            </CardGrid>
        </Group>
    )
}

function Recommendation(props) {
    const [spinner, setSpinner] = React.useState(false);
    const [recommendation, setRecommendation] = React.useState([]);

    const handleClick = () => {
        setSpinner(true);
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({'user_id': props.user_id, 'positive': props.hobbies.map(item => item.value)})
        };

        fetch("http://0.0.0.0:90/get_recommendation", requestOptions)
            .then(res => res.json())
            .then(data => {
                setRecommendation(data);
                setSpinner(false);
            });
    }

    return (
            <React.Fragment>
                <h1 size="lg" color="white">Посмотри советы от нейронной сети</h1>
                <Text weight="regular" style={{ marginBottom: 25, color: 'grey' }}>
                    Нейронная сеть выделит свойства из каждого хобби, соберет их вместе и получит твой виртуальный портрет.
                    <br /> По твоему портрету она подберет то, что максимально подходит для тебя.
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', direction: 'row' }}>
                    <Button size='l' onClick={handleClick}>Показать рекомендации</Button>
                    {spinner ? <Spinner size="regular" style={{justifyContent:'left', marginLeft: "20px"}} /> : <br/>}
                </div>
                <RenderRecommendations recommendation={recommendation} viewWidth={props.viewWidth}/>
            </React.Fragment>
    );
}

export default withAdaptivity(Recommendation, { viewWidth: true });