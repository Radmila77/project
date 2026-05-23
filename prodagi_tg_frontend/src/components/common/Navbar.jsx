import { useState } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from 'src/assets/logo.svg';
import { HashLink as LinkHash } from 'react-router-hash-link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mainLinks = [
        { title: 'Главная', to: '/' },
        { title: 'Практикум', to: '/workshop' },
        { title: 'Секретное хранилище', to: '/library', className: 'max-w-[8.5rem] xl:max-w-[9.5rem] leading-tight text-center' },
        { title: 'Обо мне', to: '/about' }
    ];

    const extraLinks = [
        { title: 'Квиз', to: '/quiz', type: 'link' },
        { title: 'Анкета', to: '/questionnaire', type: 'link' },
        { title: 'Отзывы', to: '/#reviews', type: 'hash' },
        { title: 'Вопросы и ответы', to: '/#faq', type: 'hash' }
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-custom-red/20 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between px-4">
                    <div className="flex-shrink-0">
                        <Link to="/" className="block">
                            <Logo className="h-10 w-auto sm:h-11 lg:h-12" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
                        {mainLinks.map((item) => (
                            <Link
                                key={item.title}
                                to={item.to}
                                className={`inline-flex items-center justify-center whitespace-nowrap font-roboto font-medium text-custom-gray hover:text-custom-red text-[0.9rem] xl:text-[0.9375rem] transition-colors ${item.className || ''}`}
                            >
                                {item.title}
                            </Link>
                        ))}

                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-transparent text-custom-gray hover:bg-red-50 hover:text-custom-red transition-all">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 7H20M4 12H20M4 17H20"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 mt-2 w-64 origin-top-right rounded-none bg-white/90 backdrop-blur-lg shadow-xl focus:outline-none z-50 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                                <div className="py-0">
                                    {extraLinks.map((item, index) => (
                                        <MenuItem key={item.title}>
                                            {item.type === 'hash' ? (
                                                <LinkHash
                                                    smooth
                                                    to={item.to}
                                                    className={`block px-4 py-3 text-sm font-roboto text-gray-700 data-[focus]:bg-red-50/50 data-[focus]:text-custom-red transition-colors ${
                                                        index !== extraLinks.length - 1 ? 'border-b border-gray-50' : ''
                                                    }`}
                                                >
                                                    {item.title}
                                                </LinkHash>
                                            ) : (
                                                <Link
                                                    to={item.to}
                                                    className={`block px-4 py-3 text-sm font-roboto text-gray-700 data-[focus]:bg-red-50/50 data-[focus]:text-custom-red transition-colors ${
                                                        index !== extraLinks.length - 1 ? 'border-b border-gray-50' : ''
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            )}
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-200 bg-transparent text-custom-gray transition-all hover:bg-red-50 hover:text-custom-red lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Открыть меню"
                    >
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d={mobileMenuOpen ? "M6 6L18 18M18 6L6 18" : "M4 7H20M4 12H20M4 17H20"}
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-red-100 bg-white px-4 pb-4 pt-2 lg:hidden">
                        <div className="flex flex-col rounded-3xl border border-red-100 bg-[#fcf8f8] p-3 shadow-sm">
                            {mainLinks.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.to}
                                    className="rounded-2xl px-4 py-3 text-sm font-medium text-custom-gray transition-colors hover:bg-white hover:text-custom-red"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}

                            <div className="my-2 h-px bg-red-100"></div>

                            {extraLinks.map((item) =>
                                item.type === 'hash' ? (
                                    <LinkHash
                                        key={item.title}
                                        smooth
                                        to={item.to}
                                        className="rounded-2xl px-4 py-3 text-sm font-medium text-custom-gray transition-colors hover:bg-white hover:text-custom-red"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </LinkHash>
                                ) : (
                                    <Link
                                        key={item.title}
                                        to={item.to}
                                        className="rounded-2xl px-4 py-3 text-sm font-medium text-custom-gray transition-colors hover:bg-white hover:text-custom-red"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
