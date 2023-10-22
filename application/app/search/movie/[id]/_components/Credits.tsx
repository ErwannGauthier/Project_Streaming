import Image from 'next/image';
import { CreditsMovie } from '@/app/api/TMDB/_types/CreditsMovie';
import { getCastingFromMovieCredits } from '@/app/_utils/getCastingFromMovieCredits';

interface CreditCardProps {
    name: string;
    character: string;
    gender: number;
    profile_path: string;
}

interface CreditsDivProps {
    credits: CreditsMovie;
}

interface CreditsProps {
    credits: CreditsMovie;
}

interface DivImgProps {
    profile_path: string;
    name: string;
}

interface DivSvgProps {
    gender: number;
}

function DivImg({ profile_path, name }: DivImgProps) {
    return (
        <div className="min-w-[138px] w-[138px] h-[175px] block">
            <Image className="w-full h-full" src={`https://www.themoviedb.org/t/p/w138_and_h175_face${profile_path}`} alt={name} width={138} height={175} loading="lazy" />
        </div>
    )
}

function DivSvg({ gender }: DivSvgProps) {
    const svgUrl = gender === 1 ? "/assets/images/profile_women.svg" : "/assets/images/profile_men.svg";
    return (
        <div style={{ backgroundImage: `url(${svgUrl})` }} className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[138px] w-[138px] h-[175px] bg-center bg-no-repeat"></div>
    )
}

function CreditCard({ name, character, gender, profile_path }: CreditCardProps) {
    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-gray-300 rounded-lg pb-[10px] overflow-hidden min-w-[140px] w-[140px] bg-white shadow-md">
            {profile_path ? <DivImg profile_path={profile_path} name={name} /> : <DivSvg gender={gender} />}
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">{name}</p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{character}</p>
        </li>
    )
}

function CreditsDiv({ credits }: CreditsDivProps) {
    const casting = credits ? getCastingFromMovieCredits(credits) : [];

    return (
        <div className="bg-white w-full flex flex-wrap px-[30px]">
            <section className="pt-0 w-full block px-0 pb-[30px]">
                <h3 className="font-semibold text-xl mb-[20px]">Têtes d&apos;affiche</h3>
                <div className="relative top-0 left-0">
                    <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                        {casting.map(actor => <CreditCard key={actor["cast_id"]} name={actor["name"]} character={actor["character"]} gender={actor["gender"]} profile_path={actor["profile_path"]} />)}
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Credits({ credits }: CreditsProps) {

    return (
        <div className="my-0 bg-white text-black w-full flex justify-center flex-wrap items-start content-start">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] py-[30px] w-full flex items-start content-start">
                    <CreditsDiv credits={credits} />
                </div>
            </div>
        </div>
    )
}