// Hamza
// Checks the keypad code for the Station 404 Breach puzzle.
// The frontend still calls /api/user/complete after this to mark the module done.

const STATION_NUMBER = 27;  // from Layer 1, the calendar
const EMAIL_COUNT    = 3;   // from Layer 2, the inbox
const ROOM_NUMBER    = 101; // from Layer 3, the door
const FINAL_CODE     = STATION_NUMBER + EMAIL_COUNT + ROOM_NUMBER;

// POST /api/puzzles/networkBreach/verify
async function verifyFinalCode(req, res) {

    const { code } = req.body;

    //don't crash if no code was sent
    if (code === undefined || code === null || code === "") {
        return res.status(400).json({ message: "No code provided" });
    }

    //compare as numbers so "131" and 131 both work
    if (Number(code) !== FINAL_CODE) {
        return res.status(400).json({ message: "Wrong code" });
    }

    //the frontend will round-trip /api/user/complete next
    return res.json({ message: "Module Complete", code: FINAL_CODE });
}

module.exports = { verifyFinalCode };
