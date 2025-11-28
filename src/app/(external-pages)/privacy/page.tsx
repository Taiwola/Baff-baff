export default function PrivacyPolicy() {
    return (
        <main className="app-container py-8 md:py-12 font-montserrat">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Privacy Policy
            </h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">

                <section>
                    <p>This Privacy Policy explains how <strong>Baffa Baffa</strong> collects, uses, and protects your personal information when you visit our website or place an order.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">1. Acceptance of Policy</h2>
                    <p>By using our website and placing an order (with or without creating an account), you agree to this Privacy Policy and our Terms of Service.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Full name, delivery address, phone number, and email address</li>
                        <li>Details of your order</li>
                        <li>If you create an account: your order history and saved addresses for convenience</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                    <p>We use your information only to:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>Fulfil and deliver your orders</li>
                        <li>Send order confirmations and tracking updates</li>
                        <li>Provide customer support</li>
                        <li>Improve our services</li>
                        <li>Send promotional offers only if you opt in</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">4. Payment Information</h2>
                    <p>We do not store your card details. All payments are processed securely through trusted payment partners.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
                    <p>We never sell or rent your personal information. We only share necessary details with trusted delivery partners to complete your order.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
                    <p>Your information is securely stored and protected at all times.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
                    <p>You may request to access, correct, or delete your personal data at any time by contacting us.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                    <p className="space-y-1">
                        Email: <a href="mailto:contact@baffabaffa.com" className="text-blue-600 underline">contact@baffabaffa.com</a><br />
                        Instagram: <a href="https://instagram.com/baffabaffa" className="text-blue-600 underline">@baffabaffa</a>
                    </p>
                </section>

                <p className="text-center mt-12 text-lg font-medium">
                    Thank you for choosing Baffa Baffa.
                </p>
            </div>
        </main>
    );
}