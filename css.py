#!/usr/bin/env python

from mincss.processor import Processor


URL = 'http://localhost/index.html'

def run():
    p = Processor()
    p.process(URL)

    # print "INLINES ".ljust(79, '-')
    for each in p.inlines:
        # print ("On line %s" % each.line)
        # print '- ' * 40
        # print "BEFORE"
        # print each.before
        # print '- ' * 40
        # print "AFTER:"
        print each.after
        print
    print

    # print "LINKS ".ljust(79, '-')
    for each in p.links:
        # print ("On href %s" % each.href)
        # print '- ' * 40
        # print "BEFORE"
        # print each.before
        # print '- ' * 40
        # print "AFTER:"
        print each.after
        print
    print


if __name__ == '__main__':
    run()
