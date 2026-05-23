import React from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as Telegram} from 'src/assets/tg.svg';
import {ReactComponent as Mail} from 'src/assets/mail.svg';


export default function Footer() {
    return (
        <footer className="bg-custom-bkred text-gray-200 py-12">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">

                <div className="text-center md:text-left">
                    <Link to="/" className="text-xl font-bold text-white">Воронки продаж с Эльмерой</Link>
                    <p className="text-gray-300 mt-2">Маркетолог, эксперт по продажам и продвижению в соцсетях</p>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-white mb-2">Связаться со мной</h3>
                    <div className="flex flex-col gap-2">
                        <a href="https://t.me/Vipely" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                            <Telegram className="w-5 h-5 fill-current text-white"/>
                            Телеграм
                        </a>
                        <a href="mailto:elmeraa-97@yandex.ru" target="_blank" rel="noreferrer" className="flex items-center  gap-2 hover:underline">
                            <Mail className="w-5 h-5 fill-current text-white"/>
                            elmeraa-97@yandex.ru
                        </a>
                    </div>
                </div>

                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-white mb-2">Юридическая информация</h3>
                    <p>ИП: Ахметвалеева Эльмера Наиловна</p>
                    <p>ОГРН: 323028000080500</p>
                </div>
            </div>

            <div className="container mx-auto mt-8 flex flex-col justify-center gap-5 px-4 pt-4 text-center text-xs text-gray-400 md:flex-row">
                <a href="/documents/personal-data-consent.pdf" target="_blank" rel="noreferrer" className="hover:underline">Согласие на обработку персональных данных</a>
                <a href="/documents/privacy-policy.pdf" target="_blank" rel="noreferrer" className="hover:underline">Политика конфиденциальности</a>
                <a href="/documents/advertising-consent.pdf" target="_blank" rel="noreferrer" className="hover:underline">Согласие на рекламную рассылку</a>
                <a href="/documents/offer-agreement.pdf" target="_blank" rel="noreferrer" className="hover:underline">Договор оферта</a>
            </div>
        </footer>
    );
}
