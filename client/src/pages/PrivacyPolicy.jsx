import React from 'react'

const PrivacyPolicy = () => {
  return (
    <>
    <div className="flex flex-col gap-5 lg:px-23 px-4 py-6">
          <div>
            <h3 className="text-3xl font-bold">
              Privacy Policy for{" "}
              <span className="text-[2.2rem] tracking-widest font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-[#91ff02] to-primary/90">
                MealMind
                {/* MealOnix  */}
              </span>
            </h3>
            <p className="text-xs font-mono">
              Thank you for choosing MealMind. Your privacy is important to us.
              This Privacy Policy explains how we collect, use, disclose, and
              protect your personal information when you use our services.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold"><span className="text-primary">1.</span> Information We Collect</h3>
            <div className="pl-6 font-mono text-sm space-y-2">
              <p><b>a. Information You Provide to Us</b></p>
              <ul className="list-disc pl-6">
                <li>When you sign up or use our services, you may provide personal information such as your name, email, and other details.</li>
                <li>When submitting ingredients or interacting with AI features, you may input dietary preferences or food-related queries.</li>
              </ul>
              <p><b>b. Automatically Collected Information</b></p>
              <ul className="list-disc pl-6">
                <li>IP address, browser type, device type, pages visited, and usage patterns</li>
                <li>We use cookies and similar technologies to enhance your experience. You can control cookie preferences in your browser settings.</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold"><span className="text-primary">2.</span> How We Use Your Information</h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience</li>
              <li>Respond to your inquiries or support requests</li>
              <li>Analyze trends and usage</li>
              <li>Communicate updates, promotions, or policy changes</li>
            </ul>

            <h3 className="text-2xl font-bold"><span className="text-primary">3.</span> Sharing Your Information</h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>We do <b>not sell</b> or rent your personal information to third parties.</li>
              <li>We may share your data only with trusted service providers, to comply with the law, or to protect rights and safety.</li>
            </ul>

            <h3 className="text-2xl font-bold"><span className="text-primary">4.</span> Data Security</h3>
            <p className="pl-6 font-mono text-sm">
              We implement industry-standard security measures. However, no method of storage or transmission is 100% secure.
            </p>

            <h3 className="text-2xl font-bold"><span className="text-primary">5.</span> AI-Generated Content Disclaimer</h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>MealMind uses AI to generate recipe suggestions based on user input.</li>
              <li><b>All content generated is for informational and entertainment purposes only.</b></li>
              <li>The AI may produce inaccurate or unsuitable results for certain needs.</li>
              <li><b>Users are solely responsible</b> for verifying the safety, accuracy, and appropriateness of generated content.</li>
              <li>We are <b>not liable</b> for any outcomes resulting from the use of AI-generated recipes.</li>
              <li>If you have dietary restrictions, allergies, or health conditions, please consult a qualified professional.</li>
            </ul>

            <h3 className="text-2xl font-bold"><span className="text-primary">6.</span> Third-Party Links</h3>
            <p className="pl-6 font-mono text-sm">
              Our platform may contain links to external sites. We are not responsible for their privacy practices or content.
            </p>

            <h3 className="text-2xl font-bold"><span className="text-primary">7.</span> Children's Privacy</h3>
            <p className="pl-6 font-mono text-sm">
              MealMind is not intended for users under 13. We do not knowingly collect data from children.
            </p>

            <h3 className="text-2xl font-bold"><span className="text-primary">8.</span> Changes to This Policy</h3>
            <p className="pl-6 font-mono text-sm">
              We may update this Privacy Policy. Continued use of MealMind implies acceptance of any updates.
            </p>
          </div>
        </div>
    </>
  )
}

export default PrivacyPolicy