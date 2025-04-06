
//Actions
import getRemainingTime from "@/actions/fetch/getRemainingTime";

//Components
import Header from "@/Components/Home/Header";
import CountDown from "@/Components/Home/CountDown";
import ContestantPage from "@/Components/Home/ContestantPage";
import Footer from "@/Components/Home/Footer";

const page = async () => {

    const { round } = await getRemainingTime()

    return (
        <main className="bg-white">
            <Header />
            <CountDown votingEnd={round!.votingEnd} />
            <ContestantPage />
            <Footer />
        </main>
    );
}

export default page;