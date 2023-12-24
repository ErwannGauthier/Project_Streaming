import AlertError from "@/app/_components/alerts/AlertError";

export default function InternalErrorScreen() {
    return (
        <div className="w-full h-[100vh] flex justify-center content-center items-center">
            <div className="w-2/3">
                <AlertError text="Une erreur interne est survenue."/>
            </div>
        </div>
    );
}