import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import 'github-markdown-css';
import articleCss from '@/styles/Article.module.less';

function Article(props) {

    const { articleId } = props;

    const [ article, setArticle ] = useState('');

    const theme = useSelector(state => state.setting.theme);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_HOST + '/blog/article/' + articleId);
                if(res.data.code === 0) {
                    setArticle(res.data.data);
                }
            } catch (error) {
                
            }
        }
        fetchArticle();
    }, [ article, articleId ])

    const renderers = {
        code: ({language, value}) => {
            return <SyntaxHighlighter showLineNumbers={true} style={a11yDark} language={language} children={value} />
        }
    }


    return (
        <Row justify="center">
            <Col span={20}>
                <ReactMarkdown className={['markdown-body', theme === 'dark' ? articleCss['md-body-dark'] : articleCss['md-body-light']].join(' ')} plugins={[[gfm, {singleTilde: false}]]} renderers={renderers} children={article} />
            </Col>
        </Row>
    )
}

Article.propTypes = {
    articleId: PropTypes.string
}

export default Article;