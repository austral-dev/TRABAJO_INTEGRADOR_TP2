import axios from 'axios';
import { config } from '../config/config.js';

const COINGECKO_BASE_URL = config.coinGeckoBaseUrl;
const ALPHA_VANTAGE_BASE_URL = config.alphaVantageBaseUrl;


export const getCryptoPrice = async (coinIds) => {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
        headers: {
            'x-cg-demo-api-key': config.coinGeckoApiKey
        },
        params: {
            ids: coinIds.join(','),
            vs_currencies: 'usd',
            include_24hr_change: true,
        }
    });

    return response.data;
};

export const getTopCoins = async (limit = 10) => {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
        headers: {
            'x-cg-demo-api-key': config.coinGeckoApiKey,
        },
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: false,
        }
    });

    return response.data;
};




export const getStockPrice = async (symbol) => {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
        params: {
            function: 'GLOBAL_QUOTE',
            symbol,
            apikey: config.alphaVantageApiKey,
        }
    });

    return response.data['Global Quote'];
};

export const getTopStocks = async () => {
    const results = await Promise.all(config.topStocks.map(getStockPrice));
    return results.filter(stock => stock && stock['01. symbol']);
};