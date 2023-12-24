import AlertLoading from "../alerts/AlertLoading";

export default function LoadingScreen() {
    return (
        <div className="w-full h-[100vh] flex justify-center content-center items-center">
            <div className="w-2/3">
                <AlertLoading text="Chargement..."/>
            </div>
        </div>
    );
}