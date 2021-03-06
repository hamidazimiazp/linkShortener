from django.shortcuts import render
from django.views import View
from .models import Shortener
from django.http import HttpResponseRedirect
from django.http import JsonResponse
import re
import qrcode
import qrcode.image.svg
from io import BytesIO


class Index(View):
    def __init__(self):
        self.template_name = "base/index.html"
        self.context = {}
        
    
    def get(self, request):
        return render(request, self.template_name, self.context)
    
    
    def post(self, request):
        LINK = request.POST["link"]
        validate = re.match(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', LINK);
        if validate:
            s = Shortener(long_url = LINK)
            s.save()

            # set full link
            self.context["short_link"] = request.build_absolute_uri('/') + s.short_url
            
            # make qrlcode
            factory = qrcode.image.svg.SvgImage
            img = qrcode.make(self.context["short_link"],
                              image_factory=factory, box_size=10,
                              )
            stream = BytesIO()
            img.save(stream)
            self.context["svg"] = stream.getvalue().decode()
            
                              
            return JsonResponse(self.context)
        else:
            self.context["msg"] = "Please enter valid URL."
            return JsonResponse(self.context)
    

class redirect_short_url(View):
    def __init__(self):
        self.template_name = "base/index.html"
        self.context = {}
        
        
    def get(self, request, short_url):
        try:
            shortener = Shortener.objects.get(short_url=short_url)

            shortener.times_follow += 1        

            shortener.save()
            
            return HttpResponseRedirect(shortener.long_url)
            
        except:
            self.context["msg"] = "Sorry this link is broken :("
        
            return render(request, self.template_name, self.context)