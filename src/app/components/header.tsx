import { TimeComponent } from "./time";

export function HeaderComponent() {

    return <div className="
        absolute top-0 left-0 w-screen
        p-[1rem]
        flex flex-row justify-between 
        text-white font-bold text-5xl
        ">
        <TimeComponent startingMilliseconds={new Date().getTime()} />
        {/* <TimeComponent startingMilliseconds={null} /> */}
        <h1>DL</h1>
    </div>

}
