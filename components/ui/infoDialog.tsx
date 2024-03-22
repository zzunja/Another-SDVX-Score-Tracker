import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "./button"




export function InfoDialog(){
    return (
        <Dialog>
            <DialogTrigger><InfoCircledIcon width="25" height="40"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Information & FAQ</DialogTitle>
                <DialogDescription>
                <br/>
                <p className="center">
                <p className="center bold">What is this?</p>
                This is a SDVX arcade score tracker built using next.js and shadcn.
                <br/><br/>
                <p className="center bold">How do I use this?</p>
                Simply import your CSV which you can find <a href="https://p.eagate.573.jp/game/sdvx/vi/playdata/download/index.html">here. </a>
                Once there just hit the “表示” than “ダウンロード” buttons.
                <br/>
                You will need the basic course to download your data which you can find <a href="https://p.eagate.573.jp/payment/p/course_detail.html?course=eaBASIC">here. </a> 
                <br/>
                You might also need the premium course which you can find <a href="https://p.eagate.573.jp/payment/p/course_detail.html?course=eaPREMIUM">here. </a>
                <br/>
                In total it is about 600円 which is roughly 4 dollars as of writing this. 
                <br/><br/>
                <p className="center bold"> What does the “Volforce” check do?</p>
                This shows what is being counted towards your total volforce. Only your top 50 scores are counted towards your volforce.
                <br/><br/>
                <p className="center bold">My volforce doesn’t match up.</p>
                It’s probably a rounding error on my side. Sorry!
                <br/><br/>
                <p className="center bold">The upload doesn’t work.</p>
                Give it a second if you have a lot of scores. Sometimes it takes a bit.
                <br/><br/>
                <p className="center bold">I COMPLETELY MESSED UP AND NEED TO RESET MY DATA!!!</p>
                Just click the Red Reset Button button to reset your local storage!<br/><br/>
                <Button variant="destructive" size="sm" onClick={() => localStorage.clear()}>Red Reset Button</Button>
                <br/><br/>
                <p className="center bold">Why does the website look horrible</p>
                …that wraps up the FAQ
                <br/><br/>
                <a href="https://github.com/zzunja/Another-SDVX-Score-Tracker"><img src="github.png" alt="Github" width="30px" className="centerImg"/></a>
                </p>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

  