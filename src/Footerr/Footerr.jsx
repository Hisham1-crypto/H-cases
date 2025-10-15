import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

const Footerr = () => {
  return (
    <div>
    {/* Footer */}
            <Footer container className="mt-20">
              <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                  <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                      <FooterTitle title="Follow us" />
                      <FooterLinkGroup col>
                        <FooterLink href="#">Instagram</FooterLink>
                        <FooterLink href="#">Facebook</FooterLink>
                      </FooterLinkGroup>
                    </div>
                    <div>
                      <FooterTitle title="Legal" />
                      <FooterLinkGroup col>
                        <FooterLink href="#">Privacy Policy</FooterLink>
                        <FooterLink href="#">Terms & Conditions</FooterLink>
                      </FooterLinkGroup>
                    </div>
                  </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                  <FooterCopyright
                    href="#"
                    by="H-Cases"
                    year={new Date().getFullYear()}
                  />
                  <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                    <FooterIcon href="#" icon={BsFacebook} />
                    <FooterIcon href="#" icon={BsInstagram} />
                    <FooterIcon href="#" icon={BsTwitter} />
                  </div>
                </div>
              </div>
            </Footer>
            </div>
  )
}

export default Footerr