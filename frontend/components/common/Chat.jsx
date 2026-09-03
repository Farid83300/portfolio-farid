'use client';

export default function Chat() {
    return (
        <div className="ready-chatting-option tmp-ready-chat">
            <input type="checkbox" id="click" />
            <label htmlFor="click">
                <i className="fab fa-facebook-messenger" />
                <i className="fas fa-times" />
            </label>
            <div className="wrapper">
                <div className="head-text">Message Direct !</div>
                <div className="chat-box">
                    <div className="desc-text">
                        Une question te viens a l'esprit ? Je te répond sous 24H par E-mail !
                    </div>
                    <form className="tmp-dynamic-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="field">
                            <input
                                className="input-field"
                                name="name"
                                placeholder="Ton Nom"
                                type="text"
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                className="input-field"
                                name="email"
                                placeholder="Ton Email"
                                type="email"
                                required
                            />
                        </div>
                        <div className="field textarea">
                            <textarea
                                className="input-field"
                                placeholder="Ton Message"
                                name="message"
                                required
                                defaultValue={''}
                            />
                        </div>
                        <div className="field">
                            <button name="submit" type="submit">
                                Envoi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
