import React from 'react';
import {ReactComponent as About} from 'src/assets/Mask group.svg';
import {ReactComponent as Layer} from 'src/assets/Layer 1.svg';
import { Link } from 'react-router-dom';
import SectionHeader from "../common/SectionHeader.jsx";
const AboutHome = () => {
    return (
        <div>
            <section className="bg-white overflow-hidden relative">
                <SectionHeader title="Обо мне"/>
                <div className="container mx-auto mb-12 px-4 md:mb-15">
                    <div className="relative flex flex-col gap-12 lg:flex-row lg:items-start">
                        <div className="lg:w-1/2">
                            <div className="max-w-[560px]">
                                <p className="text-base md:text-lg font-semibold leading-tight text-black mb-5">
                                    Помогаю коучам и психологам перейти от хаоса к понятной системе продаж в соцсетях
                                </p>

                                <p className="text-base md:text-lg leading-8 text-custom-gray mb-8">
                                    Вместо постоянной перегрузки, спешки и расфокуса вы получаете понятную стратегию,
                                    рабочую структуру и стабильность в продвижении.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#faf7f7] px-4 py-4">
                                        <span className="h-2.5 w-2.5 rounded-full bg-custom-red shrink-0"></span>
                                        <span className="text-base leading-7 text-custom-gray">Перегруз от постоянного потока задач</span>
                                    </li>
                                    <li className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#faf7f7] px-4 py-4">
                                        <span className="h-2.5 w-2.5 rounded-full bg-custom-red shrink-0"></span>
                                        <span className="text-base leading-7 text-custom-gray">Выгорание от отсутствия системы</span>
                                    </li>
                                    <li className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#faf7f7] px-4 py-4">
                                        <span className="h-2.5 w-2.5 rounded-full bg-custom-red shrink-0"></span>
                                        <span className="text-base leading-7 text-custom-gray">Расфокус из-за множества направлений</span>
                                    </li>
                                </ul>

                                <div className="rounded-3xl border border-custom-red/10 bg-gradient-to-r from-custom-red/10 to-white px-6 py-6 shadow-sm mb-8">
                                    <p className="text-lg md:text-xl italic leading-8 text-black">
                                        «Я заменяю хаос на систему, а выгорание - на стабильный доход.»
                                    </p>
                                </div>

                                <div className="mt-10 flex justify-start pb-6 md:pb-12">
                                    <Link to="/about"
                                          className="bg-custom-red hover:bg-custom-bkred text-white font-roboto font-medium py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                                        Подробнее обо мне

                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col items-center lg:w-1/2 lg:items-end">
                            <div className="relative w-full max-w-[400px] justify-center sm:flex lg:-top-10 lg:justify-end">
                                <div className="mx-auto inline-block rounded-full border-2 border-custom-bkred p-3 sm:mx-0">
                                <About
                                    className="relative z-10 w-full max-w-[297px] h-auto"
                                />
                                </div>
                            </div>

                            <div className="relative mt-4 w-full max-w-[400px] bg-custom-red/5 border-r-4 border-custom-red p-4 text-left text-custom-gray font-roboto text-sm md:text-base lg:-mt-8 lg:text-right">
                                <p className="font-bold text-black text-lg leading-snug">Ахметвалеева Эльмера</p>
                                <p className="mt-1 leading-relaxed">
                                    Стратегический маркетолог, эксперт  по воронкам продаж и продвижению в соцсетях
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutHome;
