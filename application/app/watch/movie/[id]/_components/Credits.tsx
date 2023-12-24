import Image from 'next/image';
import {CreditsMovie} from "@/app/_types/CreditsMovie";
import {CastMovie} from "@/app/_types/CastMovie";

interface CreditsProps {
    credits: CreditsMovie;
}

interface CreditsCardProps {
    cast: CastMovie;
}

function DivImg({cast}: CreditsCardProps) {
    const profilePath: string = cast.isProfilePath() ? cast.profilePath : "";
    const name: string = cast.isName() ? cast.name : "-";

    return (
        <div className="min-w-[138px] w-[138px] h-[175px] block">
            <Image className="w-full h-full" src={`https://www.themoviedb.org/t/p/w138_and_h175_face${profilePath}`}
                   alt={name} width={138} height={175} loading="lazy"/>
        </div>
    )
}

function DivSvg({cast}: CreditsCardProps) {
    const svgUrl: string = cast.gender === 1 ? "/assets/images/profile_women.svg" : "/assets/images/profile_men.svg";

    return (
        <div style={{backgroundImage: `url(${svgUrl})`}}
             className="flex content-center items-center flex-wrap overflow-hidden text-ellipsis bg-[#dbdbdb] box-border relative top-0 left-0 justify-center min-w-[138px] w-[138px] h-[175px] bg-center bg-no-repeat"></div>
    )
}

function CreditCard({cast}: CreditsCardProps) {
    const name: string = cast.isName() ? cast.name : "-";
    const character: string = cast.isCharacter() ? cast.character : "-";

    return (
        <li className="my-[10px] ml-[10px] mr-[4px] border-[1px] border-solid border-neutral-700 rounded-lg pb-[10px] overflow-hidden min-w-[140px] w-[140px] grayBackground shadow-md">
            {cast.isProfilePath() ? <DivImg cast={cast}/> : <DivSvg cast={cast}/>}
            <p className="px-[10px] py-0 text-base m-0 overflow-hidden text-ellipsis font-bold">{name}</p>
            <p className="m-0 py-0 px-[10px] text-sm overflow-hidden text-ellipsis">{character}</p>
        </li>
    )
}

function CreditsDiv({credits}: CreditsProps) {
    const castMovie: CastMovie[] = credits.getCasting();

    return (
        <div className="grayBackground w-full flex flex-wrap px-[30px]">
            <section className="pt-0 w-full block px-0 pb-[30px]">
                <h3 className="font-semibold text-xl mb-[20px]">Têtes d&apos;affiche</h3>
                <div className="relative top-0 left-0">
                    <ol className="overflow-x-scroll overflow-y-hidden ml-[-10px] mt-[-10px] pb-[10px] list-none list-inside mr-0 mb-0 px-0 pt-0 flex relative top-0 left-0">
                        {castMovie.map((castMovie: CastMovie) => <CreditCard key={castMovie.id} cast={castMovie}/>)}
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default function Credits({credits}: CreditsProps) {

    return (
        <div className="my-0 grayBackground w-full flex justify-center flex-wrap items-start content-start">
            <div className="w-full flex items-start content-start justify-center">
                <div className="max-w-[1400px] px-[40px] py-[30px] w-full flex items-start content-start">
                    <CreditsDiv credits={credits}/>
                </div>
            </div>
        </div>
    )
}