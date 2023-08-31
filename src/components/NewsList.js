/*API요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 
렌더링해주는 컴포넌트 , 나중에 여기서 api요청*/
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom = 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;


const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=b2952323f27847f88db17eba40b53c05`);
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    if (loading) {//대기중
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    if (!articles) {
        return null;
    }

    return (
        <NewsListBlock>
            {
                articles.map((article) => (<NewsItem key={article.url} article={article} />))
            }
        </NewsListBlock>
    )
}

export default NewsList;

